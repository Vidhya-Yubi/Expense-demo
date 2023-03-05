require 'bcrypt'
class UserController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        current_user=User.find_by_id(session[:current_user_id])        
        # puts current_user
        # render json: current_user

        if current_user.admin?
            render json: User.all
        else
            render json: "check only ur details"
        end
       
    end

    def create        
        v = !params[:name].nil? and !params[:email].nil? and params[:password].nil? and !params[:usertype].nil? and !params[:department].nil? and params[:location].nil? and params[:emp_id].nil?
        if v 
            d = User.create(
                'name': params[:name],
                'email': params[:email],
                'password': params[:password],
                'usertype': params[:usertype],
                'department': params[:department],
                'location': params[:location],
                'emp_id': params[:emp_id]
            )
            puts d 
            render json: "Data Added Successfully", status: 201
        else 
            render json: "Data not added"
        end
    end

    def update
        current_user=User.find_by_id(session[:current_user_id])   
        user_now = User.find(params[:id].to_i)
        if (current_user == user_now) 
        user_now.update('password': params[:password])
        render json: "Password updated"
        else
            render json: "Kindly input correct id.You can update only your account details."
        end
    rescue => e
        render json: " Kindly input correct id.You can update only your account details."

    end

    def destroy
        current_user=User.find_by_id(session[:current_user_id])   
        user_now = User.find(params[:id].to_i)
        if (current_user == user_now) 
            user_now.destroy
            render json: "User Account has been deleted!"
        else
            render json: "You can delete only your account. Kindly input correct id."
        end
    rescue => e
        render json: "You can delete only your account. Kindly input correct id."
    end

   


end
