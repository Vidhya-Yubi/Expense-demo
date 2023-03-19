require 'bcrypt'

class StatusController < ApplicationController
    skip_before_action :verify_authenticity_token

    def download 
        exp = Expense.find(params[:id])    
        blobid = exp.file.blob&.id
        puts "*****************"
        puts blobid
        file = ActiveStorage::Attachment.find(blobid)
        # blob = ActiveStorage::Blob.find(file.id)
        if file
        redirect_to rails_blob_path(file, disposition: 'attachment')
        # blob = ActiveStorage::Blob.find(params[:id])
        # send_data blob.download, filename: blob.filename.to_s, type: blob.content_type 
        else 
            render json: {message: "No attachments"}, status:404
        end
       
    end

    def update
        current_user=User.find_by_id(session[:current_user_id])  
        exp = Expense.find(params[:id].to_i)    

        if current_user.usertype == "1"
            exp.update(
            'status': params[:status]
            )
            puts p
            render json: {message: "Status Updated Successfully"}, status: 201
        else 
            render json: {message: "Not authorised to update status"}, status:401
        end

    end

end
