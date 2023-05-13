package yan.servlet;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import net.sf.json.JSONObject;
import yan.dao.LoginDao;
import yan.dto.UserDTO;

/**
 * Servlet implementation class api
 */

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("已经进入LoginSevlet");
		
		response.setContentType("text/html;charset=UTF-8");
		//接收小程序传过来的account和password
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		System.out.println("已经进入account"+account);
		System.out.println("已经进入password"+password);
		UserDTO user = new UserDTO(account,password);
		LoginDao logindao = new LoginDao();
		//初始化为false
		boolean isLogin = false;
		try {
			//判断是否登陆成功
			isLogin = logindao.Login(user);
			System.out.println("已经进入isLogin" +isLogin );
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Map map=new HashMap();
		if(isLogin) map.put("message", "ok");
		else map.put("message", "err");
		//要将Map转化为JSON，才可以传数据返回小程序
		JSONObject mapObject=JSONObject.fromObject(map);
		System.out.println("mapObject:"+mapObject.toString());
		//从服务器传mapObject数据到小程序
		response.getWriter().write(mapObject.toString());  			
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
