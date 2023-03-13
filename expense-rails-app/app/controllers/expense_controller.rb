require 'bcrypt'
class ExpenseController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index 
        current_user=User.find_by_id(session[:current_user_id])   
        exprep_user = Expreport.find_by('user_id': current_user&.id)
        exp =  Expense.where('expreport_id': exprep_user&.id)
        if current_user.usertype == "1" 
            extra = User.joins(:expreports).joins(:expenses).select("Users.name, Users.department, Users.emp_id, Expenses.category, Expenses.date,Expenses.amount,Expenses.description,Expenses.id,Expenses.status")
            # ParentModel.joins(:child_models).select("parent_models.*, child_models.column1, child_models.column2")
            # ext = extra.uniq
            # new_extra = extra.joins(":expenses WHERE expenses.expreport_id = #{extra.id}").select("extras.*, expenses.*")
            # puts "extra#{ext}" 
            # puts "new_extra#{new_extra}"    
            # Reservation.joins(:user).joins(:table).select("tables.seats AS table_seats")
            # result = []
            # Expense.all.each { |n| puts "#{n.expreport.user.name},#{n.expreport.user.emp_id},#{n.expreport.user.department}" }
            # es = Expense.joins(:expreport).joins(:user).select("expense.expreport.user.name, expense.expreport.user.department")
            # puts "es#{es}"
            # Expense.all.each { |n| puts d = "#{n.expreport.user.name},#{n.expreport.user.emp_id},#{n.expreport.user.department}"
            # result.push[d] }
             
            # numbers.each { |n| puts n }
            # puts "****************"result1
            render json: {data: extra.all} 
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
        puts " 88888888888"
        puts exprep_user.all
 
        if current_user
            exp = Expense.create(
            'invoicenumber': params[:invoicenumber],
            'category': params[:category],
            'date': params[:date],
            'amount': params[:amount],
            'description': params[:description],
            'file': params[:file],
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
            render json: {error: ["Not authorised to delete expense details"]}, status: 401
        end
   
    end
    def approval
        current_user=User.find_by_id(session[:current_user_id])  
        exp = Expense.find(params[:id].to_i)  
        # emp = User.find_by(id: exp.expreport_id)  
        # emp_email = emp.email
        # extra = User.joins(:expreports).joins(:expenses).select("Users.name, Users.department, Users.emp_id, Expenses.category, Expenses.date,Expenses.amount,Expenses.description,Expenses.id,Expenses.status")
        if current_user.usertype == "1"
            exp.update(
            'status': "approved"
            )
            puts p
            VidMailer.status_email(exp).deliver_now
            render json: {message: "Status Updated Successfully"}, status: 201
        else 
            render json: {error: ["Not authorised to update status"]}, status:401
        end

    end 
    def rejected
        current_user=User.find_by_id(session[:current_user_id])  
        exp = Expense.find(params[:id].to_i)    
        # emp = User.find_by(id: exp.id)  
        if current_user.usertype == "1"
            exp.update(
            'status': "rejected"
            )
            puts p
            VidMailer.status_email(exp).deliver_now
            render json: {message: "Status Updated Successfully"}, status: 201
        else 
            render json: {error: ["Not authorised to update status"]}, status:401
        end

    end


    # private

#   def expense_params
#     params.require(:expense).permit(:invoicenumber, :category, :date, :amount, :description, :status)
#   end
end
