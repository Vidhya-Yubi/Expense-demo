require 'bcrypt'
class LoginController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user = User.find_by_id(session[:current_user_id])
        render json: current_user

    end

    def create 
        uval = User.find_by('email': params[:email])
        if uval.nil? 
            render json: "User account does not exit", status: 422
        else 
            if (uval.authenticate(params[:password]))
                session[:current_user_id] = uval.id 
                puts uval.usertype

                render json: {data: uval.usertype, message:"Login successfull!"}, status: 200
            else
                render json: {error: ["Invalid username or password"]}, status: 401
            end

        end

    end

   
end
