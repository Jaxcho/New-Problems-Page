from util import latexify

def post_problem(supabase, token, problem, answer, level, topic):
    print(token)
    user_id = supabase.auth.get_user(token).user.id
    print(user_id)
    tableresponse=supabase.table('Problems').insert({'owner_id':user_id,
                                                     'answer':answer,
                                                     'problem': latexify(problem),
                                                     'topic': topic,
                                                     'level':level
                                                     }).execute()
    print(tableresponse)
    return (tableresponse.data, 200)

