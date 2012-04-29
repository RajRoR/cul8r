class MoviesController < ApplicationController
  before_filter :fetch_watch_list, :only => [:index, :show]

  def fetch_watch_list
    @movies_in_watch_list = current_user.movies_in_watch_list
  end

  def index
    @search_query = params[:q]
    conditions = @search_query.nil? ? nil : ["LOWER(name) like LOWER(?)", "%#{@search_query}%"]
    @movies = Movie.all(:limit => 20, :order => 'release_dates desc, critics_score desc', :conditions => conditions)

  end

  def show
    @movie = Movie.find params[:id]
  end

  def show_popup
    @movie = Movie.find params[:movie_id]
    render :layout => false
  end

  def cul8r
    entry = current_user.watch_list_movie_entries.create(:movie_id => params[:movie_id])
    respond_to do |format|
      if entry.errors.messages.empty?
        #update the list
        format.js { @movie = Movie.find params[:movie_id] }
      else
        format.js { @errors = entry.errors.messages.values.join(', ') }
      end
    end
  end

  def un_cul8r
    @id_to_remove = params[:dom_id]
    @movie = WatchListMovieEntry.find_by_user_id_and_movie_id current_user.id, params[:movie_id]
    @movie.destroy
    respond_to do |format|
      format.js { @movie = Movie.find params[:movie_id] }
    end
  end
end
