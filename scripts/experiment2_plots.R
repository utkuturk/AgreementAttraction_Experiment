library(knitcitations)
library(tidyverse)
library(magrittr)
library(ggplot2)
theme_set(theme_bw())

library(car, warn.conflicts = FALSE)
library(MASS)
library(brms)
library(xtable)
library(ggpubr)

library(languageR)
library(tidyverse)
library(gdata)
library(MASS)
library(magrittr)
library(ggplot2)

source("../scripts/misc.R")

fname_data <- "../workspace_exp2/exp_data.rds"

data <- readRDS(file = fname_data)

# compute by-subject percentages of 'yes' responses, and average RTs 
avg_by_subj <- data %>%
  group_by(subject, experiment, condition, 
           grammatical, verb_num, attractor_num) %>%
  summarize(avRT = mean(RT), 
            p_yes = mean(ResponseYes, na.rm = T), 
            N = sum(!is.na(ResponseYes))  )

# reformat by-subject averages to a wide format
avg_by_subj_wide <- avg_by_subj %>% 
  mutate(expcond = paste(experiment, condition, sep="_")) %>% 
  ungroup() %>%
  dplyr::select(-experiment, -condition, -avRT, -N,
                -grammatical, -verb_num, -attractor_num) %>%
  tidyr::spread(expcond, p_yes) %>% 
  mutate(delta_dc = AgrAttr_d - AgrAttr_c)

# Load Lago et al.'s monolingual data
fname_lagoetal <- "../Data/Lago_et_al/Lago_data.csv"
df_lagoetal <- read.csv(fname_lagoetal, encoding = "UTF-8", as.is = T)
df_lagoetal %<>% subset(Group == "monolingual")
df_lagoetal %<>% dplyr::select(-Accuracy, -L1:-Group, -List:-SelfRateGerman)

# Note: All rows with Experiment == "offline" also seem to be for 
#       the UNP task ('Grammatical' is NA). I wonder if these were
#       the same subjects, or if the subject labels were simply the same
#       for the two experiments.
with(df_lagoetal, stopifnot( is.na(Grammatical) == (Experiment == "offline") ))

df_lagoetal_unp <- df_lagoetal %>% 
  subset(is.na(Grammatical)) %>%
  dplyr::select(-Grammatical:-Label)
df_lagoetal_attr <- df_lagoetal %>% 
  subset(!is.na(Grammatical)) %>%
  dplyr::select(-Distance:-NewCond)

bad_subjects <- subset(avg_by_subj_wide, delta_dc <= 0.25 ) %>% .$subject

#dataAvBySubj %>% subset(subject %in% bad_subjects) %>% ggplot(aes(grammatical, p_yes, group = paste(experiment,attracted), color = experiment )) + geom_point() + geom_line(aes(linetype =attracted)) + facet_wrap(~subject)

data_clean <- data %>% subset(!subject %in% bad_subjects)

df_merge_exp2 <- data_clean %>% ungroup() %>% 
  dplyr::select(source=experiment, grammatical, attractor_num, # condition,
                subject, item=Item,
                ResponseYes, RT)
df_merge_exp2$experiment <- "Experiment 2"
df_merge_exp2$grammatical <- with(df_merge_exp2, ifelse(grammatical == "gram", 
                                                        "grammatical",
                                                        "ungrammatical"))
df_merge_exp2$attractor_num <- with(df_merge_exp2, ifelse(attractor_num == "pl", 
                                                          "plural", 
                                                          "singular"))
df_merge_exp2$item %<>% as.integer()
df_merge_exp2$subject %<>% as.character()


df_lagoetal_attr %<>% mutate(ResponseYes = (Response == "yes") )
df_merge_lago <- df_lagoetal_attr %>% ungroup() %>% 
  dplyr::select(grammatical=Grammatical, attractor_num=Attractor, #condition=Condition, 
                subject=Participant, item=Item,
                ResponseYes, RT)
df_merge_lago$experiment <- "Lago et al. (2018)" 
df_merge_lago$source <- NA
df_merge_lago$item %<>% add(1000)


df_merged <- dplyr::bind_rows(df_merge_exp2, df_merge_lago)
df_merged$subject %<>% as.factor()
df_merged$item %<>% as.factor()

avg_clean <- df_merged %>%
  group_by(experiment, source, grammatical, attractor_num) %>%
  summarize(avgRT = mean(RT), p_yes = mean(ResponseYes, na.rm = T))


avg_exp <- avg_clean %>% subset(is.na(source) | source != "filler")
avg_fillers <- avg_clean %>% subset(source == "filler")

p_avg_resp <- ggplot(avg_exp, 
                     aes(grammatical, p_yes, #linetype = attractor_num, 
                         color = attractor_num, group = attractor_num)) + 
  geom_point() + geom_line() + 
  facet_wrap(~experiment)

p_avg_resp <- p_avg_resp + geom_line(data = avg_fillers) + geom_point(data = avg_fillers)

print(p_avg_resp)

