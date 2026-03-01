<%@ page import="com.cruise.db.DBConnect" %>
<%@ page import="java.sql.*" %>

<%
String fullname = request.getParameter("fullname");
String username = request.getParameter("username");
String email = request.getParameter("email");
String phone = request.getParameter("phone");
String password = request.getParameter("password");

boolean status = false;

try {
    Connection con = DBConnect.getConnection();

    String sql = "INSERT INTO users(username, email, phone, password_hash, fullname) VALUES (?, ?, ?, ?, ?)";

    PreparedStatement ps = con.prepareStatement(sql);

    ps.setString(1, username);
    ps.setString(2, email);
    ps.setString(3, phone);
    ps.setString(4, password);
    ps.setString(5, fullname);

    int rows = ps.executeUpdate();

    if (rows > 0) {
        status = true;
    }

} catch (Exception e) {
    e.printStackTrace();
}

if (status) {
    response.sendRedirect("login.html");
} else {
    out.println("<script>alert('❌ Registration Failed'); window.location='register.html';</script>");
}
%>