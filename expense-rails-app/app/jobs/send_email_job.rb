class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(expense)
    # Do something later
    VidMailer.status_email(expense).deliver_now

  end
end
