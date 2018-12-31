# Load 
library(languageR)
library(gdata)
library(MASS)

# First convert to csv file, using the "_" and "," character as a delimter

# Setwd
setwd("C:/Users/utku/Downloads/cormorant_final/results")
getwd()

# Then load into R, splitting the csv file on the comma ","
data <- read.csv('results', 
                 header = F, 
                 comment.char = "#", 
                 encoding = "UTF-8" , 
                 col.names = paste0("V",seq_len(11)), 
                 fill = TRUE)


# Add column names to dataframe
colnames(data) = c("Time", "MD5", "Controller", "Order", "Element", "Experiment", "Condition", "Item", "Correct","Rating", "RT")

# Note: Less transparent columns
# Time: 		When results sent to server
# MD5: 			Encoding of IP address
# Controller: 	Presentation type

# Cleaning up data
# What information is there:
levels(data$Experiment)
# Remove extra information: Should I play with every condition?
data = drop.levels(subset(data, Experiment != "intro" & Experiment != "practice" & Experiment != "filler")); nrow(data)

# only condition a
#data = drop.levels(subset(data, Experiment != "intro" & Experiment != "practice" & Experiment != "filler" & Experiment != "condition_b" & Experiment != "condition_c" & Experiment != "condition_d")); nrow(data)

# Collect every other row
data$Set <- seq(0,1, by = 1)
data.items = subset(data, Set == 0)
data = subset(data, Set == 1); nrow(data)
data = drop.levels(subset(data, Item != "NULL"))

# Not thoroughly tested, but should work ...

# How many subjects? Set variable len to match subjects (assumes no MD5 repeats)
len <- length(levels(data$MD5)); len


# How many items? Set variable num to number of items
#num <- length(levels(data$Item)); num


# Add subject information and trial information
#data$Subject <- as.factor(paste("S",rep(1:len, each = num), sep=""))
md5<-levels(data$MD5)
md5_subject <- data.frame("MD5" = md5, "Subject" = sprintf("S[%s]",seq((len))), "TrialAll" = seq(1,len))
data <- merge(data,md5_subject, all = T)
levels(data$Correct)
data$Correct_p <- ifelse(grepl("P",data$Correct) , T, F)
head(data)

# Adding Trial information
#data$TrialAll <- seq(1,len)
head(data)
with(data, xtabs(~ TrialAll))
summary(data)



# ----------------------------------
# Looking for outliers
with(data, densityplot(~ as.numeric(Rating) | Subject, xlim = c(0,8), type = "percent", main = "Rating density by individual subjects" ))

# Look at Rating skews by trial
xylowess.fnc(as.numeric(Rating) ~ TrialAll|Subject, data = data, ylab = "Correct_p")


xylowess.fnc(as.numeric(Rating) ~ RT|Subject, data = subset(data, RT < 8000), ylab = "Rating")

# Calcuate average time per subject
with(data, tapply(RT, Subject, mean))
