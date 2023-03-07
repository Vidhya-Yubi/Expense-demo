require 'bcrypt'
class ExpreportController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user=User.find_by_id(session[:current_user_id])  
        exprep_user = Expreport.find_by('user_id': current_user&.id)   # &.id  If the object can be nil, use safe navigation operator &.
        if current_user.usertype == "1" 
            render json: {data: Expreport.all, status: 200} 
        else 
            render json: {data: exprep_user, status: 200} 
        end
   
    #     if current_user.nil? 
    #         render json: {message: "User does not exist"}
    #     else 
    #         exprep_user = Expreport.find_by('user_id': current_user.id)      
    #         render json: exprep_user
    #     end
    end
    def create
        current_user=User.find_by_id(session[:current_user_id])  
        # user_now = current_user.id
        if current_user
            # usr = exprep_params
            # usr[:user_id] = :current_user_id
            exprep = Expreport.create(
            'reportname': params[:reportname],
            'description': params[:description],
            'user_id': current_user.id
            )
            puts exprep
            render json: {message: "Expreport added"}, status: 201
        else
            render json: {message: "Expreport not added"}, status: 401
        end
    end

    def update 
        current_user=User.find_by_id(session[:current_user_id]) 
        exprep = Expreport.where('user_id': current_user.id) 
        er = Expreport.find(params[:id].to_i)
        if (exprep.include?(er))

            er.update(
            'reportname': params[:reportname],
            'description': params[:description]
            )
            puts er
            render json: {message: "Expreport updated"}, status: 201
        else
            render json: {message: "Not authorised to update expense report details"}, status: 401
        end
    end 

    def destroy 
        current_user=User.find_by_id(session[:current_user_id])  
        exprep = Expreport.where('user_id': current_user.id) 
        er = Expreport.find(params[:id].to_i)
        if (exprep.include?(er))
            er.destroy
            render json: {message: "All expense reports deleted"}, status: 200
        else 
            render json: {message: "Not authorised to delete expense report details"}, status: 401
        end
   
    end


#     private

#   def exprep_params
#     params.require(:expreport).permit(:tripname, :from, :to, :days)
#   end

end
