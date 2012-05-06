package controllers;

import models.FootballMatch;
import models.Player;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;
import views.html.*;

@Security.Authenticated(Secured.class)
public class UserPage extends Controller {

	public static Result userPage() {
		Player currPlayer = Player.getUserByMail(request().username());
		FootballMatch closestMatch = currPlayer.getClosestMatch();
		
    	return ok(views.html.userPage.render(currPlayer, closestMatch));
    }
}
