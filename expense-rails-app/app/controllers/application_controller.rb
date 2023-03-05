class ApplicationController < ActionController::Base
    def index 
        render json: "Welcome to Vidhya's Expense Tracker"
    end
end
