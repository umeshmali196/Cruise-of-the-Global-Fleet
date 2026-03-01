<%@ page import="com.cruise.db.DBConnect" %>
<%@ page import="java.sql.*" %>

<%
String username = request.getParameter("username");
String password = request.getParameter("password");

Connection con = DBConnect.getConnection();
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM users WHERE username=? AND password_hash=?"
);

ps.setString(1, username);
ps.setString(2, password);

ResultSet rs = ps.executeQuery();

if (rs.next()) {

    session.setAttribute("username", username);

    if (username.equals("admin") && password.equals("admin123")) {
        response.sendRedirect("admin-dashboard.html");
    } else {
        response.sendRedirect("home.html");
    }

} else {
    out.println("<script>alert('Invalid Username or Password'); window.location='login.html';</script>");
}
%>