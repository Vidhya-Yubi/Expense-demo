require 'bcrypt'
class ExpenseController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user=User.find_by_id(session[:current_user_id])        
        exprep_user = Expreport.find_by('user_id': current_user.id)
        render json: Expense.where('expreport_id': exprep_user.id)
    end
    def create
        current_user=User.find_by_id(session[:current_user_id])  
        if current_user
            exp = Expense.create(expense_params)
            render json: "Expenses added", status: 201
        else
            render json: "Expenses not added"
        end
    end


    private

  def expense_params
    params.require(:expense).permit(:invoicenumber, :category, :date, :amount, :description, :status, :expreport_id)
  end
end
