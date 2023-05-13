package yan.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.mysql.jdbc.Connection;
import yan.dto.UserDTO;
import yan.util.DataAccess;


public class LoginDao {
	//获取con
	Connection con=(Connection) DataAccess.getCon();
	public boolean Login(UserDTO user) throws SQLException{
			PreparedStatement ps=null;
			ResultSet rs=null;
			UserDTO AdminiStratordto=new UserDTO();
			String sql="select * from user where account=? and password=?";//user是数据库的表名，account和password是表所对应的属性
			ps=con.prepareStatement(sql);
			ps.setString(1,user.getAccount());
			ps.setString(2,user.getPassword());
			rs=ps.executeQuery();
			if(rs.next())	{
				return true;
			} else { 
				return false;
			}
		}
}
