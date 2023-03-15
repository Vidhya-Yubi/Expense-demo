class CommentsAdduser < ActiveRecord::Migration[7.0]
  def change 
    add_column :comments, :usname, :string 
    remove_column :expreports, :comment, :text 

  end
end
