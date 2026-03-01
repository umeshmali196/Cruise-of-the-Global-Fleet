<%@ page import="java.sql.*" %>

<%
    // Database connection details
    String url = "jdbc:mysql://localhost:3306/cruise_db";
    String user = "root";            // your MySQL username
    String pass = "umesh2004";       // your MySQL password

    Connection con = null;

    try {
        // Load MySQL JDBC Driver
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Establish Connection
        con = DriverManager.getConnection(url, user, pass);

        if (con != null) {
            out.println("<h2 style='color:green;'>✅ Database connection successful!</h2>");
        } else {
            out.println("<h2 style='color:red;'>❌ Failed to connect to database.</h2>");
        }

    } catch (Exception e) {
        out.println("<h3 style='color:red;'>⚠️ Error: " + e.getMessage() + "</h3>");
    } finally {
        try {
            if (con != null) con.close();
        } catch (Exception e) {
            out.println("<h3 style='color:red;'>Error closing connection: " + e.getMessage() + "</h3>");
        }
    }
%>
