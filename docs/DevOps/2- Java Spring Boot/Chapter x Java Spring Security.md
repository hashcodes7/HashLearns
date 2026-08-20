# Chapter: Java Spring Security

## 1. What We Did in BigKart Projects (Admin & Customer)

In our two microservices (`bigkart_admin` and `bigkart_customer`), we implemented **Basic Authentication**, which is the default security mechanism provided by Spring Security when no custom configuration class is defined.

### Steps Taken:
1. **Added Dependency**: We included the `spring-boot-starter-security` dependency in the `pom.xml` of both projects. This automatically secures all endpoints by default.
2. **Configured Default Credentials**: Instead of letting Spring generate a random password in the console every time the application starts, we overrode the default credentials in `application.properties`:
   ```properties
   spring.security.user.name=admin
   spring.security.user.password=admin123
   ```
**Purpose**: This ensures that any user trying to access the application (like visiting the admin or customer UI) is prompted with a browser-based login alert. They must provide "admin" and "admin123" to access the application.

---

## 2. General Information: Important Concepts in Spring Security

When moving beyond Basic Authentication, you need to write custom security configuration code. Here are the most important components:

### `SecurityFilterChain`
- **What it is**: A bean that defines a chain of security filters. It dictates which URL paths are secured, which are public, and how users should log in (e.g., form login, JWT token, etc.).
- **Purpose**: It is the core of modern Spring Security configuration (replacing the old `WebSecurityConfigurerAdapter`).

### `UserDetailsService`
- **What it is**: An interface with a single method `loadUserByUsername(String username)`.
- **Purpose**: It tells Spring Security how to fetch user data (username, password, and roles) from your database when someone tries to log in.

### `PasswordEncoder`
- **What it is**: A bean (usually `BCryptPasswordEncoder`) that encodes passwords.
- **Purpose**: Spring Security refuses to deal with plain-text passwords. You must provide a password encoder so it can securely hash and verify user passwords.

---

## 3. How to Implement Role-Based Spring Security (Step-by-Step)

If we wanted to upgrade `bigkart` to have a real database-backed login with Admin and User roles, here is how we would implement it.

### Step 1: Add Dependencies
Make sure you have Spring Security and a database connector in `pom.xml`.
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
**Purpose**: Brings in the required security filters and JPA for database access.

### Step 2: Create a Custom User Entity and Repository
You need a table to store users and their roles.
```java
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String role; // e.g., "ROLE_ADMIN" or "ROLE_USER"
    // getters and setters
}
```
**Purpose**: Maps user data to the database.

### Step 3: Implement `UserDetailsService`
Create a service that implements `UserDetailsService` so Spring knows how to find users.
```java
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Convert our AppUser into Spring Security's User object
        return User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPassword())
                .roles(appUser.getRole().replace("ROLE_", "")) // Spring adds "ROLE_" automatically
                .build();
    }
}
```
**Purpose**: Bridges the gap between your custom database table and Spring Security's internal authentication manager.

### Step 4: Configure `SecurityFilterChain`
Create a configuration class annotated with `@Configuration` and `@EnableWebSecurity`.
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll() // Anyone can access
                .requestMatchers("/admin/**").hasRole("ADMIN") // Only ADMIN role
                .requestMatchers("/customer/**").hasAnyRole("ADMIN", "USER") // ADMIN or USER
                .anyRequest().authenticated() // All other requests require login
            )
            .formLogin(form -> form
                .defaultSuccessUrl("/") // Redirect here after login
                .permitAll()
            )
            .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```
**Purpose**: 
- Defines authorization rules (who can access what).
- Sets up role-based access control (`hasRole`).
- Defines the login mechanism (`formLogin`).
- Provides the `PasswordEncoder` so Spring can verify hashed passwords against the database.
