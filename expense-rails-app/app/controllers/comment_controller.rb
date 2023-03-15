require 'bcrypt'
class CommentController < ApplicationController 
    skip_before_action :verify_authenticity_token 
    def show 
        # current_user=User.find_by_id(session[:current_user_id])   
        # exprep_user = Expreport.find_by('user_id': current_user&.id)
        exrep = Expreport.find(params[:id])
        co =  Comment.where('expreport_id': exrep&.id)
        render json: co
    end 

    def create 
        current_user=User.find_by_id(session[:current_user_id]) 
        # exprep_user = Expreport.find_by('user_id': current_user.id)
 
        if current_user
            com = Comment.create(
            'comment': params[:comment],
            'expreport_id': params[:expreport_id],
            'usname': current_user.name
            )
            puts com
            render json: {message: "Comments added"}, status: 201
        else
            render json: {message: "Comments not added"}
        end
    end

end
