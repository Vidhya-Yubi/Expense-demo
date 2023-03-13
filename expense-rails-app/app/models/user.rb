class User < ApplicationRecord
    has_many :expreports, dependent: :destroy
    has_many :expenses, through: :expreports, dependent: :destroy

    has_secure_password
    # enum usertype: [:normal, :admin]
    validates :email, :emp_id, uniqueness: true
    validates :email, :password, :usertype, presence: true
    
    
    
    def admin?
        usertype == "admin"
    end

end
