class User < ApplicationRecord
    has_many :expreport
    has_secure_password
    enum usertype: [:normal, :admin]
    validates :email, uniqueness: true
    validates :email, :password, :usertype, presence: true
    
    
    
    def admin?
        usertype == "admin"
    end

end
