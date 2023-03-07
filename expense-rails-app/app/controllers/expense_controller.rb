require 'bcrypt'
class ExpenseController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user=User.find_by_id(session[:current_user_id])   
        exprep_user = Expreport.find_by('user_id': current_user&.id)
        exp =  Expense.where('expreport_id': exprep_user&.id)
        if current_user.usertype == "1" 
            render json: {data: Expense.all} 
        else 
           render json: {data: exp} 
        end

        # if current_user.nil? 
        #     render json: {message: "User does not exist"}
        # else 
        #     exprep_user = Expreport.find_by('user_id': current_user&.id)
        #     render json: {message: "All Expenses deleted or no expenses added"}
        #     else 
        #      exp =  Expense.where('expreport_id': exprep_user&.id)
        #      render json: exp 
        #     end
        # end
    end
    def create
        current_user=User.find_by_id(session[:current_user_id]) 
        exprep_user = Expreport.find_by('user_id': current_user.id)
 
        if current_user
            exp = Expense.create(
            'invoicenumber': params[:invoicenumber],
            'category': params[:category],
            'date': params[:date],
            'amount': params[:amount],
            'description': params[:description],
            'status': "pending",
            'expreport_id': exprep_user.id
            )
            puts exp
            render json: {message: "Expenses added"}, status: 201
        else
            render json: {message: "Expenses not added"}
        end
    end 
    def update 
        current_user=User.find_by_id(session[:current_user_id])  
        exprep_user = Expreport.find_by('user_id': current_user.id) 
        exp = Expense.where('expreport_id': exprep_user.id) 
        er = Expense.find(params[:id].to_i)

        if (exp.include?(er))

            er.update(
                'invoicenumber': params[:invoicenumber],
                'category': params[:category],
                'date': params[:date],
                'amount': params[:amount],
                'description': params[:description]
            )
            puts er
            render json: {message: "Expenses updated"}, status: 201
        else
            render json: {message: "Expenses not updated"}, status: 401
        end
    end 

    def destroy 
        current_user=User.find_by_id(session[:current_user_id])  
        exprep_user = Expreport.find_by('user_id': current_user.id) 
        exp = Expense.where('expreport_id': exprep_user.id) 
        er = Expense.find(params[:id].to_i)    
        if (exp.include?(er)) 
            er.destroy
            render json: {message: "Expense deleted"}, status: 200
        else 
            render json: {message: "Not authorised to delete expense details"}, status: 401
        end
   
    end



    # private

#   def expense_params
#     params.require(:expense).permit(:invoicenumber, :category, :date, :amount, :description, :status)
#   end
end
