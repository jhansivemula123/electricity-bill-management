package com.electricitybill.controller;

import com.electricitybill.dto.LoginDTO;
import com.electricitybill.dto.RegisterDTO;
import com.electricitybill.entity.User;
import com.electricitybill.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getName())
            .orElse(null);

        if (user == null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        String token = generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getName());
        response.put("name", user.getName());
        response.put("role", user.getRole());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getName())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already taken"));
        }

        User user = new User();
        user.setuserName(registerDTO.getuserName());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        user.setName(registerDTO.getName());
        user.setRole(User.Role.valueOf(registerDTO.getRole().toUpperCase()));

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    private String generateToken(User user) {
    byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
    return Jwts.builder()
        .setSubject(user.getUsername())
        .claim("role", user.getRole().toString())
        .claim("name", user.getName())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
        .signWith(Keys.hmacShaKeyFor(keyBytes), SignatureAlgorithm.HS256)
        .compact();
     }
}
