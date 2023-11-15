import sharp from 'sharp'
import { Request } from 'express'
import { getNameFromFullName, handleUploadImage } from '~/utils/file'
import { UPLOAD_DIR } from '~/constants/dir'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
import { Media } from '~/models/Other'
import { MediaType } from '~/constants/enums'
config()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        //xử lý file bằng sharp, tối ưu hình ảnh, giảm dung lượng
        //filepath là đường của file cần xử lý đang nằm trong uploads/temp
        //file.newFilename: là tên unique mới của file sau khi upload lên, ta xóa đuôi và thêm jpg
        const newFileName = getNameFromFullName(file.newFilename) + '.jpg'
        const newPath = UPLOAD_DIR + '/' + newFileName
        const info = await sharp(file.filepath).jpeg().toFile(newPath)
        // xoá trong thư mục team
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newFileName}`
            : `http://localhost:${process.env.PORT}/static/image/${newFileName}`,
          type: MediaType.Image
        }
      })
    )

    return result
  }
}

const mediasService = new MediasService()
export default mediasService
