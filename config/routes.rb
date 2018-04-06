Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
<<<<<<< HEAD
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
=======
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html  
  resources :posts
>>>>>>> d5a0695f7600baf6827878aeec2808dcd3885b1c
end
