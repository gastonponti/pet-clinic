package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;


@Security.Authenticated(Secured.class)
public class UserPage extends Controller {

	public static Result index() {
    	return ok(index.render("Your new application is ready."));
    }
	
}
