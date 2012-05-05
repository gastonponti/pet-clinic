package models;

public enum MatchState {

	CONFIRMED("Confirmed"), 
	SUSPENDED("Suspended"), 
	TO_BE_CONFIRMED("To be Confirmed"), 
	PLAYED("Played");
	
	private String tag;
	
	private MatchState(String tag) {
		this.tag = tag;
	}
	
	public String toString() {
		return tag;
	}
}
