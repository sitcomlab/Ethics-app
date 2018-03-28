SELECT *
FROM 
  public.documents LEFT JOIN public.revisions ON documents.document_id = public.revisions.document_id
    LEFT JOIN  public.concerns ON revisions.revision_id = concerns.revision_id
    LEFT JOIN  public.comments ON revisions.revision_id = comments.revision_id
    LEFT JOIN  public.descriptions ON revisions.revision_id = descriptions.revision_id
    LEFT JOIN public.reviewers AS reviews ON revisions.revision_id = reviews.revision_id 
    LEFT JOIN public.members ON reviews.member_id = public.members.member_id
WHERE 
  public.documents.document_id = '25f47a60-1afc-11e8-a3b7-797e60d3f979'
ORDER BY version;