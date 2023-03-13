class Expense < ApplicationRecord
    belongs_to :expreport
    has_one_attached :file, dependent: :destroy
    # validates :invoicenumber, uniqueness: true
    # validates :invoicenumber, presence: true
end
