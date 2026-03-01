<%@ page import="com.cruise.db.*" %>
<%@ page import="java.sql.*" %>

<%
    // login.html मधून येणारी values घेणे
    String emailOrUsername = request.getParameter("email");
    String password = request.getParameter("password");

    UserDAO dao = new UserDAO();
    boolean isValid = false;

    try {
        isValid = dao.validateLogin(emailOrUsername, password);
    } catch (Exception e) {
        e.printStackTrace();
    }

    if (isValid) {
%>
        <script>
            alert("Login Successful! Welcome aboard 🚢");
            window.location.href = "Home.html";   // Success page
        </script>
<%
    } else {
%>
        <script>
            alert("❌ Invalid Email or Password. Please try again.");
            window.location.href = "login.html";
        </script>
<%
    }
%>