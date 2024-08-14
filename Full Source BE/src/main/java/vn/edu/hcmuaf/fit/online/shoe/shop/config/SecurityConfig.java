package vn.edu.hcmuaf.fit.online.shoe.shop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import vn.edu.hcmuaf.fit.online.shoe.shop.service.AccountDetail;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	private JwtAuthenticatonEntryPoint entryPoint;

	 	@Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        http.csrf()
	            .disable()
	            .authorizeRequests()
//	            .antMatchers("/api/v1/account/profile/**")
//	            .authenticated()
	            .antMatchers(
	            		"/img/**",
	            		"/token",
	            		"/oauth/**",
	            		"/api/v1/account",
	            		"/api/v1/account/**",
	            		"/api/v1/product",
	            		"/api/v1/product/**",
	            		"/api/v1/slider",
	            		"/api/v1/slider/**",
	            		"/api/v1/customer_review",
	            		"/api/v1/customer_review/**",
	            		"/api/v1/category",
	            		"/api/v1/category/**"
	            		)
	            .permitAll()
	            .antMatchers("/admin/**").hasRole("admin")
	            .anyRequest()
	            .authenticated()
	            .and()
	            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        	.and()
	        	.exceptionHandling().authenticationEntryPoint(entryPoint);
	        http.cors();
	        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	        return http.build();
	    }
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	@Bean 
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(accountDetail);
//	}
	
	@Bean
	public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception{
		return http.getSharedObject(AuthenticationManagerBuilder.class).build();
	}

}
