package controllers;

import models.Player;
import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {
  
  public static Result index() {
    return ok(index.render("Your new application is ready."));
  }
  
  
  public static Result playersList() {
	  return ok(views.html.admin.render(Player.findAll()));
  }
  
}