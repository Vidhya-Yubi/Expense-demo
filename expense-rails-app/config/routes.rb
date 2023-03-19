Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#index"
  resources :user
  resources :login 
  resources :logout
  resources :expreport
  resources :status 
  resources :comment
  resources :expense #do
  #   member do
  #     put 'approval'
  #   end 
  # end
  # put "status" , to:"expense#approval"
  get '/files/:id/download', to: 'status#download', as: 'file_download'

  put 'approve/:id', action: :approval, controller: 'expense'
  put 'rejected/:id', action: :rejected, controller: 'expense'
  get 'viewexp/:id', action: :viewexp, controller: 'expreport'
end
