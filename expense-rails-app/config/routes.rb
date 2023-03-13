Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#index"
  resources :user
  resources :login 
  resources :logout
  resources :expreport
  resources :status
  resources :expense #do
  #   member do
  #     put 'approval'
  #   end 
  # end
  # put "status" , to:"expense#approval"
  put 'approve/:id', action: :approval, controller: 'expense'
  put 'rejected/:id', action: :rejected, controller: 'expense'
end
