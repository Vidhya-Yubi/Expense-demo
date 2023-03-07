require 'bcrypt'

class StatusController < ApplicationController
    skip_before_action :verify_authenticity_token

    def update
        current_user=User.find_by_id(session[:current_user_id])  
        exp = Expense.find(params[:id].to_i)    

        if current_user.usertype == "1"
            exp.update(
            'status': params[:status]
            )
            puts p
            render json: {message: "Status Updated Successfully"}, status: 201
        else 
            render json: {message: "Not authorised to update status"}, status:401
        end

    end

end
