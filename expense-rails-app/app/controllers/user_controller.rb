require 'bcrypt'
class UserController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        current_user=User.find_by_id(session[:current_user_id])        
        # puts current_user.to_s
        # render json: current_user

        if current_user.usertype == "1"
            render json: {data: User.all}
        else
            render json: {data: current_user}
        end
       
    end

    def create       
        current_user=User.find_by_id(session[:current_user_id])         
        v = !params[:name].nil? and !params[:email].nil? and params[:password].nil? and !params[:usertype].nil? and !params[:department].nil? and params[:location].nil? and params[:emp_id].nil?
        if (v and current_user.usertype == "1")
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
            render json: {message: "Data Added Successfully"}, status: 201
        else 
            render json: {error: ["Not authorised to add Data"]}, status:401
        end
    end

    def update
        current_user=User.find_by_id(session[:current_user_id])         
        v = !params[:name].nil? and !params[:email].nil? and params[:password].nil? and !params[:usertype].nil? and !params[:department].nil? and params[:location].nil? and params[:emp_id].nil?
        if (v and current_user.usertype == "1")
            p = User.find(params[:id].to_i)
            p.update(
                'name': params[:name],
                'email': params[:email],
                'password': params[:password],
                'usertype': params[:usertype],
                'department': params[:department],
                'location': params[:location],
                'emp_id': params[:emp_id]
            )
            puts p
            render json: {message: "Data Updated Successfully"}, status: 201
        else 
            render json: {error: ["Not authorised to update Data"]}, status:401
        end

    end

    def show 
        current_user=User.find_by_id(session[:current_user_id])   
        if current_user.usertype == "1" 
            p = User.find(params[:id])
            render json: p, status: 200
        else 
            render json: {error: ["Not authorised to view current user"]}, status: 401
        end
    end

    def destroy 
        current_user=User.find_by_id(session[:current_user_id])        
        if current_user.usertype == "1" 
            p = User.find(params[:id])
            p.destroy
            render json: {message: "User deleted"}, status: 200
        else 
            render json: {error: ["Not authorised to delete user details"]}, status: 401
        end
   
    end


end
