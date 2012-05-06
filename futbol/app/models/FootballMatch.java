package models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.Constraint;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;


import com.avaje.ebean.*;

@Entity
public class FootballMatch extends Model {
	
	@Id
	public Long id;

	@OneToOne
	public Stadium stadium;
	
	@ManyToMany
	public List<Player> players;

	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm")
	public Date matchDate;
	
	public MatchState state;

    public static Model.Finder<Long,FootballMatch> find = new Model.Finder(Long.class, FootballMatch.class);
	
	public static FootballMatch findNextMatch() {
		List<FootballMatch> lst =find.where().gt("match_date", new Date()).orderBy("match_date").findList();
		if (lst.isEmpty()) {
			return null;
		}
		return lst.get(0);
	}
}
