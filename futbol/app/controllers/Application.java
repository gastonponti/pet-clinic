package controllers;

import models.Player;
import play.*;
import play.data.Form;
import play.data.validation.Constraints.Email;
import play.data.validation.Constraints.MinLength;
import play.data.validation.Constraints.Required;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static class Login {
        @Required
        @Email
        public String email;

        @Required
        public String password;
        
        public Login() {
		}
        
        public Login(String email, String password) {
        	this.email = email;
        	this.password = password;
        }

        public String validate() {
            if(Player.authenticate(email, password) == null) {
                return "Invalid user or password";
            }
            return null;
        }
    }

    /**
     * Login page.
     */
    public static Result login() {
        return ok(
            views.html.login.render(form(Login.class))
        );
    }
    
    /**
     * Handle login form submission.
     */
    public static Result authenticate() {
        Form<Login> loginForm = form(Login.class).bindFromRequest();
        if(loginForm.hasErrors()) {
            return badRequest(views.html.login.render(loginForm));
        } else {
            session("email", loginForm.get().email);
            return redirect(
                routes.UserPage.userPage()
            );
        }
    }

    /**
     * Logout and clean the session.
     */
    public static Result logout() {
        session().clear();
        flash("success", "You've been logged out");
        return redirect(
            routes.Application.login()
        );
    }
	
    public static Result index() {
    	return ok(index.render("Your new application is ready."));
    }
  
    public static Result playersList() {
    	return ok(views.html.admin.render(Player.findAll()));
    }
  
}