require 'bcrypt'
class ExpreportController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user=User.find_by_id(session[:current_user_id])        
        render json: Expreport.find_by('user_id': current_user.id)
    end
    def create
        current_user=User.find_by_id(session[:current_user_id])  
        # user_now = current_user.id
        if current_user
            exprep = Expreport.create(exprep_params)
            render json: "Expreport added", status: 201
        else
            render json: "Expreport not added"
        end
    end


    private

  def exprep_params
    params.require(:expreport).permit(:tripname, :from, :to, :days, :user_id)
  end
end
