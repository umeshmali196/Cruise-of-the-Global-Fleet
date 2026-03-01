<%@ page import="com.cruise.db.UserDAO" %>
<%@ page import="java.io.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    // Get form data
    String name = request.getParameter("name");
    String email = request.getParameter("email");
    String phone = request.getParameter("phone");
    String password = request.getParameter("password");

    // Validate empty fields
    if(name == null || email == null || phone == null || password == null ||
       name.isEmpty() || email.isEmpty() || phone.isEmpty() || password.isEmpty()) {

        out.println("<script>alert('All fields are required!'); window.location='register.html';</script>");
        return;
    }

    // Call DAO to insert user
    boolean inserted = UserDAO.registerUser(name, email, phone, password);

    if(inserted){
        out.println("<script>alert('Registration Successful! Please login.'); window.location='login.html';</script>");
    } else {
        out.println("<script>alert('Registration Failed! Email already exists.'); window.location='register.html';</script>");
    }
%>