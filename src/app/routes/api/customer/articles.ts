/**
 * /api/customer/articles...
 */
import { IRequest, IResponse, INext } from 'src/app/interfaces';
import * as urlSlug from 'url-slug';
import { articles_model } from 'src/app/models';



class Articles {

  /*
   * POST /api/customer/articles/addnew
{
  "title": "Product Num. 1"
}
   * Add new article.
   */
  addnew = (req: IRequest, res: IResponse, next: INext) => {
    const articleDoc = req.body;
    articleDoc.slug = urlSlug.convert(articleDoc.title, {
      transformer: urlSlug.LOWERCASE_TRANSFORMER
    });

    /*** insert user into 'users' collection ***/
    articles_model.add(articleDoc)
      .then(insDoc => {
          res.json({
              success: true,
              count: 1,
              message: 'Article is inserted.',
              data: insDoc
          });
      })
      . catch (err => {
          err.category = 'api';
          next(err);
      });
  }







}

const articles = new Articles();
export { Articles, articles };
