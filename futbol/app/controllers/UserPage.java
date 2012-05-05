package controllers;

import models.FutbolMatch;
import models.Player;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;
import views.html.*;

@Security.Authenticated(Secured.class)
public class UserPage extends Controller {

	public static Result userPage() {
    	return ok(views.html.userPage());
    }
}
