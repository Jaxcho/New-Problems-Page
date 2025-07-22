def signup(supabase, info):
    response= supabase.auth.sign_up(
        {
            'email':info.get('email'),
            'password':info.get('password')
        }
    )
    id = response.user.id
    token = response.session.access_token
    tableresponse=supabase.table('Users').insert({'id':id, 'user_name':info.get("username")}).execute()
    if(not tableresponse):
        return "Failed", 500
    return {"id": id, "token": token}, 201

def login(supabase, info):
    response = supabase.auth.sign_in_with_password({
        'email': info.get('email'),
            'password': info.get('password')
        })
    # print(response)
    return {"id": response.user.id, "token": response.session.access_token}, 200

