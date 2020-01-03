

if (exists("le_poster")) {
  p_avg_resp <- avg_exp$resp %>% subset(experiment == "Experiment 1") %>%
    ggplot(aes(grammatical, M, #linetype = attractor_num, 
               color = attractor_num, group = attractor_num)) + 
    geom_point() + geom_line() + theme( strip.background = element_rect(fill="white")) +
    facet_wrap(~experiment)
  
  p_avg_resp <- p_avg_resp + geom_errorbar(aes(ymin = M - 1.96*SE, ymax = M + 1.96*SE), width = 0.1)
  
  # p_avg_resp <- p_avg_resp + geom_line(data = avg_fillers) + 
  #                             geom_point(data = avg_fillers) + 
  
  p_avg_resp <- p_avg_resp + theme( strip.background = element_rect(fill="white") ) +
    theme_bw() + xlab("") + ylab("Percentage 'acceptable'")
  p_avg_resp <- p_avg_resp + scale_y_continuous(labels=scales::percent, limits = c(0,1))#, breaks = c(0, .25, .5, .75, 1))
  p_avg_resp <- p_avg_resp + theme_bw()
  p_avg_resp <- p_avg_resp + scale_color_discrete(name = "Attractor Number")
  ggsave(filename = "./plots_le/exp1.jpeg", p_avg_resp, height = 2.5, width = 2.5*2)
}


if (exists("le_poster"))
{
  fname_exp1_responses <- "../workspace_exp1/model_responses_justexp1"
  m_responses_exp1 <- brm(ResponseYes ~ cUngrammatical * cAttractorPlural + 
                            (cUngrammatical * cAttractorPlural + 1| subject) +
                            (cUngrammatical * cAttractorPlural + 1| item),
                          data = df_merged_nofillers %>% subset(experiment == "Experiment 1"),
                          family = bernoulli("probit"),
                          file = fname_exp1_responses, 
                          chains = n_chains, cores = n_cores, iter = n_iter)
  
}
if (exists("le_poster"))
{
  p_m_response_exp1 <- 
    create_model_coefs_plot( m_responses_exp1, 
                             plot_stats = T, map_names = contrast_names,
                             expand_right = 2.5, expand_top = 5, x_stat_adjust = 1.1,
                             x_breaks = c(-3,-2,-1, 0,1, 2) ) + 
    xlab("Estimate (log-odds)")
  
  p_m_response_exp1 <- p_m_response_exp1 + annotate(x=-3, xend=2, y=0, yend=0, lwd=0.25, geom="segment")
  
  ggsave(filename = "./plots_le/m_exp1.jpeg", p_m_response_exp1, height = 1.5, width = 2.5*2)
}



if (exists("le_poster")) {
  
  p_avg_resp2 <- p_avg_resp2 + scale_y_continuous(labels=scales::percent, limits = c(0, 1))
  ggsave(filename = "./plots_le/exp2.jpeg", p_avg_resp2, height = 2.5, width = 2.5*2)
}
