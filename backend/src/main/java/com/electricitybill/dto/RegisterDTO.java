package com.electricitybill.dto;

public class RegisterDTO {

    private String username;
    private String password;
    private String email;
    private String name;
    private String role = "CUSTOMER";

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getuserName() { return username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}