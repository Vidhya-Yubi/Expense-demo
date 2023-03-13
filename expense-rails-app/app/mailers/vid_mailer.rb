class VidMailer < ApplicationMailer
    def status_email(expense)
        @expense = expense
        mail(to: expense.expreport.user.email, subject: 'Status update on expenses!')
      end
end
