package yan.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import yan.dto.UserDTO;
import yan.util.DataAccess;

import com.mysql.jdbc.Connection;

public class RegisterDAO {
	Connection con=(Connection) DataAccess.getCon();
	public boolean Register(UserDTO user) {
		PreparedStatement ps=null;
		ResultSet rs=null;
		String sql="Insert into user(account,password) values(?,?)";
		try {
			ps=con.prepareStatement(sql);
			ps.setString(1,user.getAccount());
			ps.setString(2,user.getPassword());
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
