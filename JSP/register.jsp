<%@ page import="com.cruise.db.UserDAO" %>
<%@ page import="java.sql.*" %>

<%
String fullname = request.getParameter("fullname");
String username = request.getParameter("username");
String email = request.getParameter("email");
String phone = request.getParameter("phone");
String password = request.getParameter("password");

UserDAO dao = new UserDAO();
boolean added = dao.registerUser(fullname, username, email, phone, password);

if (added) {
    response.sendRedirect("login.html");
} else {
    out.println("<script>alert('Registration Failed'); window.location='register.html';</script>");
}
%>