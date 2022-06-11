/**
 * /api/customer/articles...
 */
import { IRequest, IResponse, INext } from 'src/app/interfaces';
import * as urlSlug from 'url-slug';
import { articles_model } from 'src/app/models';
import { IArticle } from 'src/app/interfaces';



class Articles {

  /*
   * POST /api/customer/articles/addnew
{
  "title": "Product Num. 1"
}
   * Add new article.
   */
  addnew = (req: IRequest, res: IResponse, next: INext) => {
    const articleDoc: IArticle = req.body;
    articleDoc.slug = urlSlug.convert(articleDoc.title, {
      transformer: urlSlug.LOWERCASE_TRANSFORMER
    });

    // insert user into 'articles' collection
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


  /*
   * DELETE /api/customer/articles/:_id
   * Remove an article.
   */
  del = (req: IRequest, res: IResponse, next: INext) => {
    const _id: string = req.params._id;

    articles_model.deleteOne({_id})
      .then(resp => {
        console.log(resp);
          const success = !!resp;
          res.json({
              success,
              message: success ? 'Article is deleted.' : 'Article is not deleted.'
          });
      })
      . catch (err => {
          err.category = 'api';
          next(err);
      });
  }


  /*
   * GET /api/customer/articles/:_id
   * Get an article.
   */
  getone = (req: IRequest, res: IResponse, next: INext) => {
    const _id: string = req.params._id;

    articles_model.getOne({_id})
      .then(doc => {
          res.json({
              success: !!doc,
              data: doc
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
