class StatusUpdateJob < ApplicationJob
  queue_as :default

  def perform(exp_id)
    # Do something later
    exp = Expense.find(exp_id)  

    exp.update_status_randomly
   
  end
end
