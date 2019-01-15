# LIBRARIES & DATA ------
  library(languageR)
  library(tidyverse)
  library(gdata)
  library(MASS)
library(magrittr)

# First convert to csv file, using the "_" and "," character as a delimter
# setwd("C:/Users/utku/Downloads/cormorant_final/results")
# getwd()

# Then load into R, splitting the csv file on the comma ","
  data <- read.csv('results', 
                   header = F, 
                   comment.char = "#", 
                   encoding = "UTF-8" , 
                   col.names = paste0("V",seq_len(11)), 
                   fill = TRUE)


# Add column names to dataframe
colnames(data) = c("Time", "MD5", "ControllerType", "SentenceNoInStimFile", "Element", "Type", "Item", "Sentence", "Question","Answer", "RT")

# Note: Less transparent columns
# Time: 		When results sent to server
# MD5: 			Encoding of IP address
# Controller: 	Presentation type

  
# Cleaning up data
# What information is there:
# levels(data$Type)
# Remove extra information: Should I play with every condition?







# FORM & PRACTICE ------
# Make Form Entries Columns and left join them, get for unique MD5
FormEntries <- subset(data, ControllerType != "DashedAcceptabilityJudgment" ) %>% drop.levels(); nrow(data)
data %<>% subset(ControllerType == "DashedAcceptabilityJudgment")
  
age <- dplyr::select(FormEntries, MD5,Sentence,Question) %>% 
  dplyr::filter(Sentence == "age") %>%
  dplyr::select(MD5, Age = Question)

# Note: The radio buttons on the page returned "male" when participants specified that they were native speakers of Turkish, and "female" otherwise,
# due to a copy-and-paste error.
natturk <- dplyr::select(FormEntries, MD5,Sentence,Question) %>% 
  dplyr::filter(Sentence == "natturk") %>%
  dplyr::select(MD5, Natturk = Question) %>%
  mutate(Natturk = Natturk == "male")

# Note: The radio buttons on the page returned "male" when participants specified that they were right-handed, and "female", when they were left-handed,
# due to a copy-and-paste error.
dex <- dplyr::select(FormEntries, MD5,Sentence,Question) %>% 
  dplyr::filter(Sentence == "dex") %>%
  dplyr::select(MD5, Dex = Question) %>%
  mutate(Dex = ifelse(Dex == "male", "right-handed", "left-handed"))

FormPart <- dplyr::left_join(age, natturk, by = "MD5") %>% 
  dplyr::left_join(., dex , by = "MD5" ) %>% 
  unique()

# How many subjects? Set variable len to match subjects (assumes no MD5 repeats)
lenForm <- length(levels(factor(FormPart$MD5))); lenForm

# Add subject information and trial information
#dataPart$Subject <- as.factor(paste("S",rep(1:lenData, each = numData), sep = ""))
md5form <- levels(factor(FormPart$MD5))
md5form_subject <- data.frame("MD5" = md5form, "Subject" = sprintf("S[%s]",seq((lenForm))))

FormPart <- merge(FormPart,md5form_subject, all = T)


### Deal with the proper data
stopifnot( nrow(data) %% 2 == 0 )
rows_stim <- data[c(T,F),]
rows_resp <- data[c(F,T),]

# keep only the responses
data <- rows_resp %>% left_join(md5form_subject) %>% dplyr::select(-MD5, -Time, -ControllerType, -Sentence, -Element) %>%
                      dplyr::rename(ResponseCorrect=Answer, Response=Question)

# handle late responses
data %<>% within({ late_response = (Response == "NULL")
                   Response[late_response] = NA
                   ResponseCorrect[late_response] = NA
                 })

responses <- c(yes="İYİ (P'ye basınız)", no="KÖTÜ (Q'ya basınız)")
stopifnot( all(data$Response %in% responses | is.na(data$Response) ) )

data$ResponseYes <- ifelse(grepl("P",data$Response) , T, 
                          ifelse(grepl("Q",data$Response) , F, NA))


# add conditions
data$condition <- 
with(data, case_when(Type == "filler" & SentenceNoInStimFile >= 200 ~ "a",
                     Type == "filler" & SentenceNoInStimFile < 200 ~ "b",
                     Type == "condition_a" ~ "a",
                     Type == "condition_b" ~ "b",
                     Type == "condition_c" ~ "c",
                     Type == "condition_d" ~ "d",
                     TRUE ~ as.character(NA)))
data$experiment <- ifelse(data$Type %in% c("condition_a", "condition_b", "condition_c", "condition_d"), "AgrAttr", as.character(data$Type))

data %>% group_by(experiment, condition) %>% 
        summarise(perc_yes = mean(ResponseYes, na.rm = T),
                  perc_na = mean(is.na(ResponseYes)))


conditions_info <- data.frame(experiment = c("AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "filler", "filler"),
                              condition = c("a","b","c","d", "a","b"),
                              grammatical = c("ungram", "gram", "ungram", "gram", "ungram", "gram"),
                              verb_num = c("sg","pl","sg","pl", "sg","pl"),
                              stringsAsFactors = FALSE) 
data %<>% left_join(conditions_info)



data %>% subset(experiment == "filler" & condition == "a") %>% group_by(Item) %>% 
            dplyr::summarise(perc_yes = mean(ResponseYes, na.rm = T), N = sum(!is.na(ResponseYes))) %>% 
            arrange(perc_yes)


##  DivideFillers
FillerItemsA <- subset(FillerItems, Order >= 200)
FillerItemsA$correctAnswer <- rep("K?T? (Q'ya bas?n?z)", length(FillerItemsA))
FillerItemsA$Type <- rep("filler_A", length(FillerItemsA))
FillerItemsA <- tidyr::unite(FillerItemsA, MD5_Order_Dunno, MD5, Order, Dunno, remove = T)

FillerItemsB <- subset(FillerItems, Order < 200)
FillerItemsB$correctAnswer <- rep("?Y? (P'ye bas?n?z)", length(FillerItemsB))
FillerItemsB$Type <- rep("filler_B", length(FillerItemsB))
FillerItemsB <- tidyr::unite(FillerItemsB, MD5_Order_Dunno, MD5, Order, Dunno, remove = T)

FillerItemsUnite <- rbind(FillerItemsA, FillerItemsB) 

FillerQ <- subset(Fillerog, Set == 1)
FillerQ <- dplyr::select(FillerQ, -Item, -Set) %>% tidyr::unite(., MD5_Order_Dunno, MD5,Order,Dunno, remove = T)
colnames(FillerQ) <- c("MD5_Order_Dunno" , "Answer" , "RT")

FillerPart <- dplyr::left_join(FillerQ, FillerItemsUnite, by = "MD5_Order_Dunno") %>% 
  unique() %>% tidyr::separate(., MD5_Order_Dunno, c("MD5", "Order", "Dunno"), remove = T)
#FillerPart <- dplyr::left_join(Filler, FillerItemsUnite, by = "MD5_Order_Dunno") %>% tidyr::separate(., MD5_Order_Dunno, c("MD5", "Order", "Dunno"), remove = T)
FillerPart <- FillerPart[,c(1,2,3,8,6,4,7,5)]
FillerPart$Answer_is_correct <- ifelse(FillerPart$Answer == FillerPart$correctAnswer, 1, 0)

# Subject information
# How many subjects? Set variable len to match subjects (assumes no MD5 repeats)
lenFiller <- length(levels(factor(FillerPart$MD5))); lenFiller

# How many items? Set variable num to number of items
numFiller <- length(levels(factor(FillerPart$Item))); numFiller

# Add subject information and trial information
#dataPart$Subject <- as.factor(paste("S",rep(1:lenData, each = numData), sep = ""))
md5filler <- levels(factor(FillerPart$MD5))
md5filler_subject <- data.frame("MD5" = md5filler, "Subject" = sprintf("S[%s]",seq((lenFiller))), "TrialAll" = seq(1,lenFiller))
FillerPart <- merge(FillerPart,md5filler_subject, all = T)

itemfiller <- levels(factor(FillerPart$Item))
itemfiller_id <- data.frame("Item" = itemfiller, "ItemNo" = sprintf("I[%s]", seq((numFiller))))
FillerPart <- merge(FillerPart, itemfiller_id, all = T)

# Check the correctAnswers
# Filter people according to their Age (Like 0 and such for Pavel entries)
# group by subject and their accuracy in practice and filler accuracy
# think about what to do with NULL responses in the data






# EXPERIMENTAL ITEMS ----
dataog = drop.levels(subset(data, Type != "intro" & Type != "practice" & Type != "filler")); nrow(data)
dataog <- dplyr::select(dataog, MD5, Order, Type, Dunno, Item, Question, RT)
dataog$Set <- seq(0,1, by = 1)

dataItems = subset(dataog, Set == 0) %>% 
  dplyr::select(., MD5, Order, Type, Dunno, Item) %>%
  tidyr::unite(., MD5_Order_Type_Dunno, MD5, Order, Type, Dunno, sep = "-", remove = T)

# DATA QUESTIONS
dataQ = subset(dataog, Set == 1) %>% 
  dplyr::select(., -Set, -Item) %>%
  tidyr::unite(., MD5_Order_Type_Dunno, MD5, Order, Type, Dunno, sep = "-", remove = T)

dataPart <- dplyr::left_join(dataItems, dataQ, by = "MD5_Order_Type_Dunno") %>% 
  unique() %>% 
  tidyr::separate(., MD5_Order_Type_Dunno, c("MD5", "Order", "Type", "Dunno"), sep = "-", remove = T)

# How many subjects? Set variable len to match subjects (assumes no MD5 repeats)
lenData <- length(levels(factor(dataPart$MD5))); lenData
# How many items? Set variable num to number of items
numData <- length(levels(factor(dataPart$Item))); numData
# Add subject information and trial information
#dataPart$Subject <- as.factor(paste("S",rep(1:lenData, each = numData), sep = ""))
md5 <- levels(factor(dataPart$MD5))
md5_subject <- data.frame("MD5" = md5, "Subject" = sprintf("S[%s]",seq((lenData))), "TrialAll" = seq(1,lenData))
dataPart <- merge(dataPart,md5_subject, all = T)
itemdata <- levels(factor(dataPart$Item))
itemdata_id <- data.frame("Item" = itemdata, "ItemNo" = sprintf("I[%s]", seq((numFiller))))
dataPart <- merge(dataPart, itemdata_id, all = T)




# CLEAN UP
rm(age,dataItems, dataQ, dex, FillerItems, FillerItemsA, FillerItemsB, FillerItemsUnite, Fillerog, FillerQ, FormEntries, gender, Practice, PracticeItems,dataog, md5_subject, md5filler_subject, md5form_subject, md5, lenData, lenFiller, lenForm, md5filler, md5form, numData, numFiller, numForm,itemdata,itemdata_id,itemfiller_id,itemfiller)
#left with (i)  dataPart, 
#          (ii) FillerPart, 
#          (iii)FormPart, 
#          (iv) PracticePart, 
#          (v)  and the original read.csv output: data.








# FUN PART -----
# for fillers
# by Type
filler_TypeCheck <- FillerPart %>% group_by(Type) %>% summarize(S_iC = sum(Answer_is_correct), #subject is correct 
                                            S_iNC = sum(!Answer_is_correct), #subject is not correct
                                            Proportion = mean(Answer_is_correct),
                                            nAll = sum(Answer_is_correct) + sum(!Answer_is_correct), #total number of answers
                                            Length = length(Answer_is_correct) , 
                                            N_total = S_iC + S_iNC
                                             )

ItemCheck <- FillerPart %>% group_by(Type, ItemNo) %>% summarize(S_iC = sum(Answer_is_correct), #subject is correct 
                                            S_iNC = sum(!Answer_is_correct), #subject is not correct
                                            Proportion = mean(Answer_is_correct),
                                            nAll = sum(Answer_is_correct) + sum(!Answer_is_correct), #total number of answers
                                            Length = length(Answer_is_correct) , 
                                            N_total = S_iC + S_iNC
)

subjectCheck <- FillerPart %>% group_by(Subject) %>% summarize(S_iC = sum(Answer_is_correct), #subject is correct 
                                                           S_iNC = sum(!Answer_is_correct), #subject is not correct
                                                           Proportion = mean(Answer_is_correct),
                                                           nAll = sum(Answer_is_correct) + sum(!Answer_is_correct), #total number of answers
                                                           Length = length(Answer_is_correct) , 
                                                           N_total = S_iC + S_iNC
)

# for data

levels(dataPart$Question)
dataPart = drop.levels(subset(dataPart, Question != "NULL"))
dataPart$Correct_p <- ifelse(grepl("P",dataPart$Question) , T, F)

#there is a problm with item numbering check it.
data_TypeCheck <- dataPart %>% group_by(Type) %>% summarize(S_iC = sum(Correct_p), #subject is correct 
                                            S_iNC = sum(!Correct_p), #subject is not correct
                                            Proportion = mean(Correct_p),
                                            nAll = sum(Correct_p) + sum(!Correct_p), #total number of answers
                                            Length = length(Correct_p) , 
                                            N_total = S_iC + S_iNC
)

data_ItemCheck <- dataPart %>% group_by(Type, ItemNo) %>% summarize(S_iC = sum(Correct_p), #subject is correct 
                                                                 S_iNC = sum(!Correct_p), #subject is not correct
                                                                 Proportion = mean(Correct_p),
                                                                 nAll = sum(Correct_p) + sum(!Correct_p), #total number of answers
                                                                 Length = length(Correct_p) , 
                                                                 N_total = S_iC + S_iNC
                                                              )

data_subjectCheck <- dataPart %>% group_by(Subject) %>% summarize(S_iC = sum(Correct_p), #subject is correct 
                                                               S_iNC = sum(!Correct_p), #subject is not correct
                                                               Proportion = mean(Correct_p),
                                                               nAll = sum(Correct_p) + sum(!Correct_p), #total number of answers
                                                               Length = length(Correct_p) , 
                                                               N_total = S_iC + S_iNC
                                                                )















# REST ----
# levels(data$Correct)
# data$Correct_p <- ifelse(grepl("P",data$Correct) , T, F)
# head(data)

# head(data)
# with(data, xtabs(~ TrialAll))
# summary(data)

# Looking for outliers
with(data, densityplot(~ as.numeric(Rating) | Subject, xlim = c(0,8), type = "percent", main = "Rating density by individual subjects" ))

# Look at Rating skews by trial
xylowess.fnc(as.numeric(Rating) ~ TrialAll|Subject, data = data, ylab = "Correct_p")


xylowess.fnc(as.numeric(Rating) ~ RT|Subject, data = subset(data, RT < 8000), ylab = "Rating")

# Calcuate average time per subject
with(data, tapply(RT, Subject, mean))
