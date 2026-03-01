<%@ page import="com.cruise.db.*" %>
<%@ page import="java.sql.*" %>

<%
    // Form मधून values घेणे
    String fullname = request.getParameter("fullname");
    String username = request.getParameter("username");
    String email = request.getParameter("email");
    String phone = request.getParameter("phone");
    String password = request.getParameter("password");

    // Password hashing जर हवा असेल तर (simple version)
    String passwordHash = password;  // Later MD5/SHA256 करता येईल

    UserDAO dao = new UserDAO();
    boolean isAdded = false;

    try {
        isAdded = dao.registerUser(fullname, username, email, phone, passwordHash);
    } catch (Exception e) {
        e.printStackTrace();
    }

    if (isAdded) {
%>
        <script>
            alert("Registration Successful! Please Login.");
            window.location.href = "login.html";
        </script>
<%
    } else {
%>
        <script>
            alert("❌ Registration Failed! Username or Email already exists.");
            window.location.href = "register.html";
        </script>
<%
    }
%>