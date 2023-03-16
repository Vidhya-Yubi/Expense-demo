class Expense < ApplicationRecord
    belongs_to :expreport
    has_one_attached :file, dependent: :destroy
    # validates :invoicenumber, uniqueness: true
    # validates :invoicenumber, presence: true 
    STATUSES = ['pending', 'approved', 'rejected'] 
    def update_status_randomly
        new_status = STATUSES.sample
        update_attribute(:status, new_status)
      end
end
